using Businesslogic.Units.Interfaces;
using Data.AppData;
using Shared.Enums;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Businesslogic.Units
{
    public class UnitRepository : IUnitRepository
    {
        private readonly AppDataContext _appDataContext;
        private readonly UnitGenerator _unitGenerator;
        private bool disposedValue;

        public UnitRepository(AppDataContext appDataContext, UnitGenerator unitGenerator = null)
        {
            _appDataContext = appDataContext;
            _unitGenerator = unitGenerator;
        }

        public async Task<List<UnitResult>> GetAllUnitResults(UnitTypeEnum unitType, LevelTypeEnum? levelType, int? userId)
        {
            try
            {
                if (userId == null && levelType == null)
                {
                    return await Task.FromResult(_appDataContext.UnitResults.Where(unit => unit.UnitType == unitType).ToList());
                }

                if (userId == null)
                {
                    return await Task.FromResult(_appDataContext.UnitResults.Where(unit => unit.UnitType == unitType && unit.Level == levelType).ToList());
                }

                return await Task.FromResult(_appDataContext.UnitResults.Where(unit =>
                    unit.UnitType == unitType
                    && unit.Level == levelType
                    && unit.UserId == userId
                ).ToList());


            }
            catch (Exception exception)
            {
                return await Task.FromResult(new List<UnitResult>());
            }


        }

        public async Task<Unit> GenerateUnit(UnitTypeEnum unitType, LevelTypeEnum levelType, int userId, CalculationRuleEnum? calculationRule)
        {
            try
            {
                var unitGenerator = _unitGenerator ?? new UnitGenerator();
                return await _unitGenerator.GenerateUnit(unitType, levelType, userId, calculationRule);
            }
            catch (Exception exception)
            {
                return await Task.FromResult(new Unit
                {
                    UserId = userId,
                    Level = levelType,
                    UnitType = unitType
                });
            }

        }

        public async Task SaveUnitResult(UnitResult result)
        {
            try
            {
                _appDataContext.UnitResults.Add(result);

                if (await _appDataContext.SaveChangesAsync() == 0)
                {
                    throw new Exception("Cound not save unit result");
                }

            }
            catch (Exception exeption)
            {

            }
        }

        public async Task<List<UnitStatistic>> GetStatistics(int userId)
        {
            var results = new List<UnitStatistic>();

            var allResults = _appDataContext.UnitResults.Where(unit => unit.UserId == userId).ToList();

            if (!allResults.Any())
            {
                return results;
            }

            results = (from res in allResults
                       group res by res.UnitType into unitTypeGrp
                       select new UnitStatistic
                       {
                           UnitType = unitTypeGrp.Key,
                           PercentValue = GetCalculateValue(unitTypeGrp.Select(result => result), unitTypeGrp.Key),
                           AllQuestions = unitTypeGrp.Sum(unit => unit.QuestionCount)
                       })?.ToList();


            return await Task.FromResult(results);
        }

        private decimal GetCalculateValue(IEnumerable<UnitResult> results, UnitTypeEnum unitType)
        {
            var allQuestions = results.Sum(res => res.QuestionCount);
            var points = results.Sum(res => res.Points);

            return (points * 100) / allQuestions;

        }

        private int GetPointsPerQuestion(UnitTypeEnum unitType)
        {
            switch (unitType)
            {
                case UnitTypeEnum.NumberChaos:
                    return 3;
                default: return 0;
            }
        }

        #region dispose
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _appDataContext.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            // Ändern Sie diesen Code nicht. Fügen Sie Bereinigungscode in der Methode "Dispose(bool disposing)" ein.
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}

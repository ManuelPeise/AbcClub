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
    public class UnitRepository: IUnitRepository
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


            }catch (Exception exception)
            {
                return await Task.FromResult(new List<UnitResult>());
            }


        }

        public async Task<Unit> GenerateUnit(UnitTypeEnum unitType, LevelTypeEnum levelType, int userId)
        {
            try
            {
                var unitGenerator = _unitGenerator ?? new UnitGenerator();
                return await _unitGenerator.GenerateUnit(unitType, levelType, userId);
            }
            catch(Exception exception)
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

                if(await _appDataContext.SaveChangesAsync() == 0)
                {
                    throw new Exception("Cound not save unit result");
                }

            }catch (Exception exeption)
            {

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

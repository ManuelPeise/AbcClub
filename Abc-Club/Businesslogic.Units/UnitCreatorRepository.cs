using Businesslogic.Units.Interfaces;
using Data.AppData;
using Microsoft.EntityFrameworkCore;
using Shared.Enums;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Businesslogic.Units
{
    public class UnitCreatorRepository : IUnitCreatorRepository
    {
        private bool disposedValue;

        private AppDataContext _appDataContext;

        public UnitCreatorRepository(AppDataContext appDataContext)
        {
            _appDataContext = appDataContext;
        }

        public async Task CreateOrUpdateUnit(CustomUnit unit)
        {
            try
            {
                if (await IsValidUnit(unit) && await UnitExists(unit))
                {
                    await UpdateUnit(unit);

                    return;
                }
                else
                {
                    await AddUnit(unit);

                    return;
                }

                throw new Exception("Could nit create new unit.");

            }
            catch (Exception exception)
            {

            }
        }
        
        public async Task<List<CustomUnit>> GetUnits(UnitTypeEnum unitType, LevelTypeEnum level, int unitCount = 5)
        {
            try
            {
                var matchingUnits = _appDataContext.UnitStore.Where(x => x.UnitType == unitType && x.Level == level).ToList();

                return await Task.FromResult(matchingUnits);

                throw new Exception("Could not get units from database.");
            }
            catch (Exception exception)
            {
                return null;
            }
        }

        public async Task DeleteUnit(int id)
        {
            var unit = _appDataContext.UnitStore.Where(x => x.Id == id).FirstOrDefault();

            try
            {
                if (unit != null)
                {
                    _appDataContext.UnitStore.Remove(unit);
                    _appDataContext.Entry(unit).State = EntityState.Deleted;

                    await _appDataContext.SaveChangesAsync();

                    return;
                }

                throw new Exception($"Could not delete unit [ID: {id}].");
            }
            catch (Exception exception)
            {

            }
        }
        
        private async Task<bool> IsValidUnit(CustomUnit unit)
        {
            if (unit != null)
            {
                if (unit.UnitContext != null && await IsValidUnitType(unit.UnitType))
                {
                    return await Task.FromResult(true);
                }
            }

            return await Task.FromResult(false);
        }

        private async Task<bool> UnitExists(CustomUnit unit)
        {
            return await Task.FromResult(_appDataContext.UnitStore.Select(x => x.Id == unit.Id).Any());
        }

        private async Task UpdateUnit(CustomUnit unit)
        {
            var modified = _appDataContext.UnitStore.Single(x => x.Id == unit.Id);

            modified.UnitContext = unit.UnitContext;
            _appDataContext.UnitStore.Update(modified);
            _appDataContext.Entry(modified).State = EntityState.Modified;

            await _appDataContext.SaveChangesAsync();
        }
        
        private async Task AddUnit(CustomUnit unit)
        {
            _appDataContext.UnitStore.Add(unit);
            _appDataContext.Entry(unit).State = EntityState.Added;
            await _appDataContext.SaveChangesAsync();
        }
        
        private async Task<bool> IsValidUnitType(UnitTypeEnum unitType)
        {
            switch (unitType)
            {
                case UnitTypeEnum.NumberChaos:
                case UnitTypeEnum.AbcQuiz:
                case UnitTypeEnum.Calculation:
                    return await Task.FromResult(false);
                default: return await Task.FromResult(false);
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

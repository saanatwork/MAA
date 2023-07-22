using BusinessLogicLayer.IRepository;
using BusinessObjectLayer.CommonClass;
using BusinessObjectLayer.Master;
using DataAccessLayer2.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Repository
{
    public class MasterRepository : IMasterRepository
    {
        MasterEntity _MasterEntity;
        public MasterRepository()
        {
            _MasterEntity = new MasterEntity();
        }
        public List<BankMaster> GetBankName(ref string pMsg)
        {
            return _MasterEntity.GetBankName(ref pMsg);
        }
        public List<DropDownOptions> GetBlockOfaDistrict(int DistrictID, ref string pMsg)
        {
            List<DropDownOptions> result = _MasterEntity.GetBlockOfaDistrict(DistrictID, ref pMsg);
            return result.OrderBy(o=>o.DisplayText).ToList();
        }
        public List<ExDropDownOptions> GetDesignations(ref string pMsg)
        {
            return _MasterEntity.GetDesignations(ref pMsg);
        }
        public List<DropDownOptions> GetDistricts(ref string pMsg)
        {
            List<DropDownOptions> result = _MasterEntity.GetDistricts(ref pMsg);
            return result.OrderBy(o => o.DisplayText).ToList();
        }
        public string GetDocNo(string DocPattern, ref string pMsg)
        {
            return _MasterEntity.GetDocNo(DocPattern, ref pMsg);
        }
    }
}

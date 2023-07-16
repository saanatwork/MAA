using BusinessLogicLayer.IRepository;
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
    }
}

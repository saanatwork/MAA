using BusinessObjectLayer.Master;
using DataAccessLayer2.DataSync;
using DataAccessLayer2.ObjectMapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer2.Entities
{
    public class MasterEntity
    {
        MasterDataSync _MasterDataSync;
        MasterObjectMapper _MasterObjectMapper;
        DataTable dt;
        public MasterEntity()
        {
            _MasterDataSync = new MasterDataSync();
            _MasterObjectMapper = new MasterObjectMapper();
        }
        public List<BankMaster> GetBankName(ref string pMsg) 
        {
            List<BankMaster> result = new List<BankMaster>();            
            try
            {
                dt = _MasterDataSync.GetBankName(ref pMsg);
                if (dt != null && dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        result.Add(_MasterObjectMapper.Map_BankMaster(dt.Rows[i], ref pMsg));
                    }
                }
            }
            catch (Exception ex) { pMsg=ex.Message; }
            return result;
        }
    }
}

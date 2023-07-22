using BusinessObjectLayer.CommonClass;
using BusinessObjectLayer.Master;
using BusinessObjectLayer.MyUser;
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
        DBResponseMapper _DBResponseMapper;
        DataTable dt;
        public MasterEntity()
        {
            _MasterDataSync = new MasterDataSync();
            _MasterObjectMapper = new MasterObjectMapper();
            _DBResponseMapper = new DBResponseMapper();
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
        public string GetDocNo(string DocPattern, ref string pMsg) 
        {
            string result = "";
            try
            {
                dt = _MasterDataSync.GetDocNo(DocPattern,ref pMsg);
                if (dt != null && dt.Rows.Count > 0)
                {
                    if (!DBNull.Value.Equals(dt.Rows[0]["NewDocumentNumber"]))
                        result = dt.Rows[0]["NewDocumentNumber"].ToString();
                }
            }
            catch (Exception ex) { pMsg = ex.Message; }
            return result;
        }
        public List<DropDownOptions> GetDistricts(ref string pMsg) 
        {
            List<DropDownOptions> result = new List<DropDownOptions>();
            try
            {
                dt = _MasterDataSync.GetDistricts(ref pMsg);
                if (dt != null && dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        result.Add(_MasterObjectMapper.Map_DropDownOptions(dt.Rows[i], ref pMsg));
                    }
                }
            }
            catch (Exception ex) { pMsg = ex.Message; }
            return result;
        }
        public List<DropDownOptions> GetBlockOfaDistrict(int DistrictID,ref string pMsg)
        {
            List<DropDownOptions> result = new List<DropDownOptions>();
            try
            {
                dt = _MasterDataSync.GetBlockOfaDistrict(DistrictID,ref pMsg);
                if (dt != null && dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        result.Add(_MasterObjectMapper.Map_DropDownOptions(dt.Rows[i], ref pMsg));
                    }
                }
            }
            catch (Exception ex) { pMsg = ex.Message; }
            return result;
        }
        public List<ExDropDownOptions> GetDesignations(ref string pMsg)
        {
            List<ExDropDownOptions> result = new List<ExDropDownOptions>();
            try
            {
                dt = _MasterDataSync.GetDesignations(ref pMsg);
                if (dt != null && dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        result.Add(_MasterObjectMapper.Map_ExDropDownOptions(dt.Rows[i], ref pMsg));
                    }
                }
            }
            catch (Exception ex) { pMsg = ex.Message; }
            return result;
        }
        public bool SetUser(MSSYUser data, ref string pMsg) 
        {
            bool result = false;
            _DBResponseMapper.Map_DBResponse(_MasterDataSync.SetUser(data, ref pMsg), ref pMsg, ref result);
            return result;
        }


    }
}

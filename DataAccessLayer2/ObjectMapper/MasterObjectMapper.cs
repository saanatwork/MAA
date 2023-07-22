using BusinessObjectLayer.CommonClass;
using BusinessObjectLayer.Master;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer2.ObjectMapper
{
    public class MasterObjectMapper
    {
        public BankMaster Map_BankMaster(DataRow dr, ref string pMsg)
        {
            BankMaster result = new BankMaster();
            try
            {
                if (dr != null)
                {
                    if (!DBNull.Value.Equals(dr["BankID"]))
                        result.BankID = int.Parse(dr["BankID"].ToString());
                    if (!DBNull.Value.Equals(dr["BankName"]))
                        result.BankName = dr["BankName"].ToString();
                    
                }
            }
            catch (Exception ex) { pMsg = ex.Message; }
            return result;
        }
        public DropDownOptions Map_DropDownOptions(DataRow dr, ref string pMsg)
        {
            DropDownOptions result = new DropDownOptions();
            try
            {
                if (dr != null)
                {
                    if (!DBNull.Value.Equals(dr["ID"]))
                        result.ID = int.Parse(dr["ID"].ToString());
                    if (!DBNull.Value.Equals(dr["DisplayText"]))
                        result.DisplayText = dr["DisplayText"].ToString();
                }
            }
            catch (Exception ex) { pMsg = ex.Message; }
            return result;
        }
        public ExDropDownOptions Map_ExDropDownOptions(DataRow dr, ref string pMsg)
        {
            ExDropDownOptions result = new ExDropDownOptions();
            try
            {
                if (dr != null)
                {
                    if (!DBNull.Value.Equals(dr["ID"]))
                        result.ID = int.Parse(dr["ID"].ToString());
                    if (!DBNull.Value.Equals(dr["DisplayText"]))
                        result.DisplayText = dr["DisplayText"].ToString();
                    if (!DBNull.Value.Equals(dr["IDStr"]))
                        result.IDStr = dr["IDStr"].ToString();
                }
            }
            catch (Exception ex) { pMsg = ex.Message; }
            return result;
        }
    }
}

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
    }
}

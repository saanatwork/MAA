using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer2.DataSync
{
    public class MasterDataSync
    {
        public DataTable GetBankName(ref string pMsg)
        {
            try
            {
                using (SQLHelper sql = new SQLHelper("select * from [MTR].[GetBankName]()", CommandType.Text))
                {
                    return sql.GetDataTable(ref pMsg);
                }
            }
            catch (Exception ex) { pMsg = ex.Message;  return null; }
        }
    }
}

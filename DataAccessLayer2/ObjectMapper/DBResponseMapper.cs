using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer2.ObjectMapper
{
    public class DBResponseMapper
    {
        public void Map_DBResponse(DataTable dt, ref string pMsg, ref bool IsSuccess)
        {
            if (dt != null && dt.Rows.Count > 0)
            {
                if (!DBNull.Value.Equals(dt.Rows[0]["IsSuccess"]))
                    IsSuccess = bool.Parse(dt.Rows[0]["IsSuccess"].ToString());
                if (!DBNull.Value.Equals(dt.Rows[0]["Msg"]))
                    pMsg = dt.Rows[0]["Msg"].ToString();
            }
        }
    }
}

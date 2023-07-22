using BusinessObjectLayer.MyUser;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer2.ParamMapper
{
    public class MasterParamMapper
    {
        public SqlParameter[] MapParam_GetDocNo(string DocPattern, ref string pMsg)
        {
            int paracount = 0;
            SqlParameter[] para = new SqlParameter[1];
            try
            {
                para[paracount] = new SqlParameter("@Pattern", SqlDbType.NVarChar,10);
                para[paracount++].Value = DocPattern; 
            }
            catch (Exception ex)
            {
                pMsg =  ex.Message;
            }
            return para;
        }
        public SqlParameter[] MapParam_SetUser(MSSYUser data, ref string pMsg)
        {
            int paracount = 0;
            SqlParameter[] para = new SqlParameter[11];
            try
            {
                para[paracount] = new SqlParameter("@DistrictCode", SqlDbType.BigInt);
                para[paracount++].Value = data.DistrictCode;
                para[paracount] = new SqlParameter("@Bloc_ULB_Code", SqlDbType.BigInt);
                para[paracount++].Value = data.BlockCode;
                para[paracount] = new SqlParameter("@Designation", SqlDbType.NVarChar,5);
                para[paracount++].Value = data.Designation;
                para[paracount] = new SqlParameter("@FirstName", SqlDbType.NVarChar,50);
                para[paracount++].Value = data.FirstName;
                para[paracount] = new SqlParameter("@LastName", SqlDbType.NVarChar,50);
                para[paracount++].Value = data.LastName;
                para[paracount] = new SqlParameter("@ContactNumber", SqlDbType.NChar,10);
                para[paracount++].Value = data.ContactNumber;
                para[paracount] = new SqlParameter("@EmailID", SqlDbType.NVarChar);
                para[paracount++].Value = data.EmailID;
                para[paracount] = new SqlParameter("@UserName", SqlDbType.NChar,10);
                para[paracount++].Value = data.UserName;
                para[paracount] = new SqlParameter("@Password", SqlDbType.NVarChar);
                para[paracount++].Value = data.Password;
                para[paracount] = new SqlParameter("@SecretQuestion", SqlDbType.NVarChar);
                para[paracount++].Value = data.SecretQuestion;
                para[paracount] = new SqlParameter("@Answer", SqlDbType.NVarChar);
                para[paracount++].Value = data.Answer;
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
            }
            return para;
        }
    }
}

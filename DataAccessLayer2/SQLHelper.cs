using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer2
{
    public class SQLHelper : IDisposable
    {
        private SqlCommand oCmd = null;
        private SqlDataAdapter da = null;
        private String vConTimeOut = ConfigurationManager.AppSettings["ConTimeOut"];
        private String conStr = String.Empty;
        DataTable dt = null;
        DataSet ds = null;

        public SQLHelper()
        {
            oCmd = new SqlCommand();
            oCmd.CommandTimeout = Convert.ToInt32(vConTimeOut);
        }
        public SQLHelper(String pSqlString, CommandType pCmdType)
        {
            oCmd = new SqlCommand();
            oCmd.CommandText = pSqlString;
            oCmd.CommandType = pCmdType;
            oCmd.CommandTimeout = Convert.ToInt32(vConTimeOut);
        }

        private String GetConStr()
        {
            try
            {
                conStr = DbConnectionString.GetDBConnectionString();
                conStr += ";Connect Timeout= " + vConTimeOut + "; pooling='true'; Max Pool Size=200;";
                return conStr;
            }
            catch
            {
                return String.Empty;
            }
        }
        // Get parameter from Sqlcommand by id
        public SqlParameter this[Int32 id]
        {
            get
            {
                return oCmd.Parameters[id];
            }
        }
        // Get parameter from Sqlcommand by name
        public SqlParameter this[String name]
        {
            get
            {
                return oCmd.Parameters[name];
            }
        }
        public Object GetParameterValue(Int16 pId, ref String pMsg)
        {
            try
            {
                return (Object)this[pId].Value;
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
                return null;
            }
        }
        public Object GetParameterValue(String pName, ref String pMsg)
        {
            try
            {
                return (Object)this[pName].Value;
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
                return null;
            }
        }
        public Object ExecuteScaler(ref String pMsg)
        {
            Object oRet = null;
            try
            {
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    con.Open();
                    oRet = oCmd.ExecuteScalar();
                }
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
            }
            return oRet;
        }
        public Object ExecuteScaler(SqlParameter[] pParamList, ref String pMsg)
        {
            Object oRet = null;
            try
            {
                foreach (SqlParameter vParam in pParamList)
                {
                    if (vParam != null)
                        oCmd.Parameters.Add(vParam);
                    else
                    {
                        pMsg = "Parameter list must not contain null.";
                        return oRet;
                    }
                }
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    con.Open();
                    oRet = oCmd.ExecuteScalar();
                }
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
            }
            return oRet;
        }
        public bool ExecuteNonQuery(ref String pMsg)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    con.Open();
                    int r = oCmd.ExecuteNonQuery();
                    if (r > 0)
                        return true;
                    else
                        return false;
                }
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
                return false;
            }
        }
        public bool ExecuteNonQuery(SqlParameter[] pParamList, ref String pMsg)
        {
            try
            {
                foreach (SqlParameter vParam in pParamList)
                {
                    if (vParam != null)
                        oCmd.Parameters.Add(vParam);
                    else
                    {
                        pMsg = "Parameter list must not contain null.";
                        return false;
                    }
                }
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    con.Open();
                    int r = oCmd.ExecuteNonQuery();
                    if (r > 0)
                        return true;
                    else
                        return false;
                }
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
                return false;
            }
        }
        public DataTable GetDataTable()
        {
            try
            {
                dt = new DataTable();
                da = new SqlDataAdapter();
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    da.SelectCommand = oCmd;
                    con.Open();
                    da.Fill(dt);
                }
                return dt;
            }
            catch
            {
                //pMsg = ex.Message;
                return null;
            }
            finally
            {
                if (dt != null)
                {
                    dt.Dispose();
                }
                if (da != null)
                {
                    da.Dispose();
                }
            }
        }
        public DataTable GetDataTable(ref string pMsg)
        {
            try
            {
                dt = new DataTable();
                da = new SqlDataAdapter();
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    da.SelectCommand = oCmd;
                    con.Open();
                    da.Fill(dt);
                }
                return dt;
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
                return null;
            }
            finally
            {
                if (dt != null)
                {
                    dt.Dispose();
                }
                if (da != null)
                {
                    da.Dispose();
                }
            }
        }
        public DataTable GetDataTable(SqlParameter[] pParamList)
        {
            try
            {
                dt = new DataTable();
                da = new SqlDataAdapter();
                foreach (SqlParameter vParam in pParamList)
                {
                    if (vParam != null)
                        oCmd.Parameters.Add(vParam);
                    else
                    {
                        //pMsg = "Parameter list must not contain null.";
                        return null;
                    }
                }
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    da.SelectCommand = oCmd;
                    con.Open();
                    da.Fill(dt);
                }
                return dt;
            }
            catch
            {
                //pMsg = ex.Message;
                return null;
            }
            finally
            {
                if (dt != null)
                {
                    dt.Dispose();
                }
                if (da != null)
                {
                    da.Dispose();
                }
            }
        }
        public DataTable GetDataTable(SqlParameter[] pParamList, ref string pMsg)
        {
            try
            {
                dt = new DataTable();
                da = new SqlDataAdapter();
                foreach (SqlParameter vParam in pParamList)
                {
                    if (vParam != null)
                        oCmd.Parameters.Add(vParam);
                    else
                    {
                        //pMsg = "Parameter list must not contain null.";
                        return null;
                    }
                }
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    da.SelectCommand = oCmd;
                    con.Open();
                    da.Fill(dt);
                }
                return dt;
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
                return null;
            }
            finally
            {
                if (dt != null)
                {
                    dt.Dispose();
                }
                if (da != null)
                {
                    da.Dispose();
                }
            }
        }
        public DataSet GetDataSet()
        {
            DataSet ds = null;
            try
            {
                ds = new DataSet();
                da = new SqlDataAdapter();
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    da.SelectCommand = oCmd;
                    con.Open();
                    da.Fill(ds);
                }
                return ds;
            }
            catch
            {
                //pMsg = ex.Message;
                return null;
            }
            finally
            {
                if (ds != null)
                {
                    ds.Dispose(); ds = null;
                }
            }
        }
        public DataSet GetDataSet(ref string pMsg)
        {
            DataSet ds = null;
            try
            {
                ds = new DataSet();
                da = new SqlDataAdapter();
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    da.SelectCommand = oCmd;
                    con.Open();
                    da.Fill(ds);
                }
                return ds;
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
                return null;
            }
            finally
            {
                if (ds != null)
                {
                    ds.Dispose(); ds = null;
                }
            }
        }
        public DataSet GetDataSet(SqlParameter[] pParamList)
        {
            DataSet ds = null;
            try
            {
                ds = new DataSet();
                da = new SqlDataAdapter();
                foreach (SqlParameter vParam in pParamList)
                {
                    if (vParam != null)
                        oCmd.Parameters.Add(vParam);
                    else
                    {
                        //pMsg = "Parameter list must not contain null.";
                        return null;
                    }
                }
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    da.SelectCommand = oCmd;
                    con.Open();
                    da.Fill(ds);
                }
                return ds;
            }
            catch
            {
                return null;
            }
            finally
            {
                if (ds != null)
                {
                    ds.Dispose(); ds = null;
                }
            }
        }
        public DataSet GetDataSet(SqlParameter[] pParamList, ref string pMsg)
        {
            DataSet ds = null;
            try
            {
                ds = new DataSet();
                da = new SqlDataAdapter();
                foreach (SqlParameter vParam in pParamList)
                {
                    if (vParam != null)
                        oCmd.Parameters.Add(vParam);
                    else
                    {
                        pMsg = "Parameter list must not contain null.";
                        return null;
                    }
                }
                using (SqlConnection con = new SqlConnection(GetConStr()))
                {
                    oCmd.Connection = con;
                    da.SelectCommand = oCmd;
                    con.Open();
                    da.Fill(ds);
                }
                return ds;
            }
            catch (Exception ex)
            {
                pMsg = ex.Message;
                return null;
            }
            finally
            {
                if (ds != null)
                {
                    ds.Dispose(); ds = null;
                }
            }
        }

        /// <summary>
        /// Resource Management
        /// </summary>
        public void Dispose()
        {
            if (dt != null)
            {
                dt.Dispose();
                dt = null;
            }
            if (ds != null)
            {
                ds.Dispose();
                ds = null;
            }
            if (da != null)
            {
                da.Dispose();
                da = null;
            }
            if (oCmd != null)
            {
                oCmd.Dispose();
                oCmd = null;
            }
            //Dispose(true);
            //GC.SuppressFinalize(this);
        }
    }
}

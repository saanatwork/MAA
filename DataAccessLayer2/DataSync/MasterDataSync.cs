﻿using BusinessObjectLayer.MyUser;
using DataAccessLayer2.ParamMapper;
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
        MasterParamMapper _MasterParamMapper;
        public MasterDataSync()
        {
            _MasterParamMapper = new MasterParamMapper();
        }
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
        public DataTable GetDocNo(string DocPattern, ref string pMsg)
        {
            try
            {
                using (SQLHelper sql = new SQLHelper("[MTR].[GetNewDocNumber]", CommandType.StoredProcedure))
                {
                    return sql.GetDataTable(_MasterParamMapper.MapParam_GetDocNo(DocPattern, ref pMsg), ref pMsg);
                }
            }
            catch (Exception ex) { pMsg = ex.Message; return null; }
        }
        public DataTable GetDistricts(ref string pMsg)
        {
            try
            {
                using (SQLHelper sql = new SQLHelper("select * from [MTR].[GetDistricts]()", CommandType.Text))
                {
                    return sql.GetDataTable(ref pMsg);
                }
            }
            catch (Exception ex) { pMsg = ex.Message; return null; }
        }
        public DataTable GetBlockOfaDistrict(int DistrictID,bool IsRural, ref string pMsg)
        {
            try
            {
                using (SQLHelper sql = new SQLHelper("select * from [MTR].[GetBlocks]("+ DistrictID + ","+ (IsRural?1:0)+ ")", CommandType.Text))
                {
                    return sql.GetDataTable(ref pMsg);
                }
            }
            catch (Exception ex) { pMsg = ex.Message; return null; }
        }
        public DataTable GetDesignations(ref string pMsg)
        {
            try
            {
                using (SQLHelper sql = new SQLHelper("select * from [MTR].[GetDesignations]()", CommandType.Text))
                {
                    return sql.GetDataTable(ref pMsg);
                }
            }
            catch (Exception ex) { pMsg = ex.Message; return null; }
        }
        public DataTable SetUser(MSSYUser data, ref string pMsg)
        {
            try
            {
                using (SQLHelper sql = new SQLHelper("[USR].[SetUser]", CommandType.StoredProcedure))
                {
                    return sql.GetDataTable(_MasterParamMapper.MapParam_SetUser(data, ref pMsg), ref pMsg);
                }
            }
            catch (Exception ex) { pMsg = ex.Message; return null; }
        }
        public DataTable GetUserData(string UserName,ref string pMsg)
        {
            try
            {
                using (SQLHelper sql = new SQLHelper("select * from [MTR].[GetUserData]('"+ UserName + "')", CommandType.Text))
                {
                    return sql.GetDataTable(ref pMsg);
                }
            }
            catch (Exception ex) { pMsg = ex.Message; return null; }
        }
        public bool ValidateUser(string UserName, ref string pMsg)
        {
            try
            {
                using (SQLHelper sql = new SQLHelper("SELECT [MTR].[ValidateUser]('" + UserName + "')", CommandType.Text))
                {
                    return bool.Parse(sql.ExecuteScaler(ref pMsg).ToString());
                }
            }
            catch (Exception ex) { pMsg = ex.Message; return false; }
        }
    }
}

﻿using BusinessObjectLayer.CommonClass;
using BusinessObjectLayer.Master;
using BusinessObjectLayer.MyUser;
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
        public MSSYUser Map_MSSYUser(DataRow dr, ref string pMsg)
        {
            MSSYUser result = new MSSYUser();
            try
            {
                if (dr != null)
                {
                    if (!DBNull.Value.Equals(dr["DistrictCode"]))
                        result.DistrictCode = int.Parse(dr["DistrictCode"].ToString());
                    if (!DBNull.Value.Equals(dr["Bloc_ULB_Code"]))
                        result.BlockCode = int.Parse(dr["Bloc_ULB_Code"].ToString());
                    if (!DBNull.Value.Equals(dr["Designation"]))
                        result.Designation = dr["Designation"].ToString();
                    if (!DBNull.Value.Equals(dr["FirstName"]))
                        result.FirstName = dr["FirstName"].ToString();
                    if (!DBNull.Value.Equals(dr["LastName"]))
                        result.LastName = dr["LastName"].ToString();
                    if (!DBNull.Value.Equals(dr["ContactNumber"]))
                        result.ContactNumber = dr["ContactNumber"].ToString();
                    if (!DBNull.Value.Equals(dr["EmailID"]))
                        result.EmailID = dr["EmailID"].ToString();
                    if (!DBNull.Value.Equals(dr["UserName"]))
                        result.UserName = dr["UserName"].ToString();
                    if (!DBNull.Value.Equals(dr["IsActive"]))
                        result.IsActive =bool.Parse(dr["IsActive"].ToString());
                    if (!DBNull.Value.Equals(dr["HashedPassword"]))
                        result.Password = dr["HashedPassword"].ToString();
                    if (!DBNull.Value.Equals(dr["SecretQuestion"]))
                        result.SecretQuestion = dr["SecretQuestion"].ToString();
                    if (!DBNull.Value.Equals(dr["Answer"]))
                        result.Answer = dr["Answer"].ToString();
                }
            }
            catch (Exception ex) { pMsg = ex.Message; }
            return result;
        }



    }
}

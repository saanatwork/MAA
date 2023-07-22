using BusinessLogicLayer.IRepository;
using BusinessObjectLayer.MyUser;
using DataAccessLayer2.Entities;
using System.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Web;

namespace BusinessLogicLayer.Repository
{
    public class UserRepository: IUserRepository
    {
        MasterEntity _MasterEntity;
        public UserRepository()
        {
            _MasterEntity = new MasterEntity();
        }
        public MSSYUser GetUserData(string UserName, ref string pMsg)
        {
            return _MasterEntity.GetUserData(UserName, ref pMsg);
        }
        public bool LoginUser(string UserName, string Password, ref string pMsg)
        {
            bool result = false;
            MSSYUser user= _MasterEntity.GetUserData(UserName, ref pMsg);
            if (user.IsActive)
            {
                if (Crypto.VerifyHashedPassword(user.Password, Password)) 
                {
                    result = true;
                    setUser(user);
                }
                else 
                {
                    pMsg = "Invalid Password.";
                }
            } 
            else 
            {
                pMsg = "User Is Not Active.";
            }
            return result;
        }
        public bool SetUser(MSSYUser data, ref string pMsg)
        {
            string dcode = data.DistrictCode.ToString().Trim().Substring(2, 2);
            string pattern = data.DistrictCode.ToString().Trim().Substring(2, 2) + data.Designation.Substring(0, 3);
            data.UserName = _MasterEntity.GetDocNo(pattern, ref pMsg);
            data.Password = Crypto.HashPassword(data.RawPassword);
            return _MasterEntity.SetUser(data, ref pMsg);
        }
        public bool ValidateUser(string UserName, ref string pMsg)
        {
            return _MasterEntity.ValidateUser(UserName, ref pMsg);
        }


        private void setUser(MSSYUser user)
        {
            user.Password = "";
            string json = JsonConvert.SerializeObject(user, Formatting.None);
            //var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            //var json = serializer.Serialize(user);
            HttpContext.Current.Response.Cookies.Add(
                new HttpCookie("LUser", json)
                { Expires = DateTime.Now.AddDays(7) });
        }
        public void LogOut()
        {
            //clearing cookies
            HttpCookie cookie = HttpContext.Current.Request.Cookies["LUser"];
            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddMonths(-1);
                HttpContext.Current.Response.Cookies.Add(cookie);
            }
        }
        public MSSYUser getLoggedInUser()
        {
            MSSYUser user = new MSSYUser();
            HttpCookie cookie = HttpContext.Current.Request.Cookies["LUser"];
            if (cookie != null)
            {
                user = JsonConvert.DeserializeObject<MSSYUser>(cookie.Value);
            }
            return user;
        }
    }
}

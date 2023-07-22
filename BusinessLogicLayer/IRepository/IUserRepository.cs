using BusinessObjectLayer.MyUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IRepository
{
    public interface IUserRepository
    {
        bool SetUser(MSSYUser data, ref string pMsg);
        bool ValidateUser(string UserName, ref string pMsg);
        MSSYUser GetUserData(string UserName, ref string pMsg);
        bool LoginUser(string UserName,string Password,ref string pMsg);
        void LogOut();
        MSSYUser getLoggedInUser();
    }
}

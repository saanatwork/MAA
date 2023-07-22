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
    }
}

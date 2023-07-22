using BusinessLogicLayer.IRepository;
using BusinessObjectLayer.MyUser;
using DataAccessLayer2.Entities;
using System.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Repository
{
    public class UserRepository: IUserRepository
    {
        MasterEntity _MasterEntity;
        public UserRepository()
        {
            _MasterEntity = new MasterEntity();
        }
        public bool SetUser(MSSYUser data, ref string pMsg)
        {
            string dcode = data.DistrictCode.ToString().Trim().Substring(2, 2);
            string pattern = data.DistrictCode.ToString().Trim().Substring(2, 2) + data.Designation.Substring(0, 3);
            data.UserName = _MasterEntity.GetDocNo(pattern, ref pMsg);
            data.Password = Crypto.HashPassword(data.RawPassword);
            return _MasterEntity.SetUser(data, ref pMsg);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.MyUser
{
    public class MSSYUser
    {
        public int DistrictCode { get; set; }
        public int BlockCode { get; set; }
        public string Designation { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactNumber { get; set; }
        public string EmailID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string RawPassword { get; set; }
        public string SecretQuestion { get; set; }
        public string Answer { get; set; }
        public bool IsActive { get; set; }
    }

}

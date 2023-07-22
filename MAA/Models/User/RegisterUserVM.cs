using BusinessObjectLayer.CommonClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MAA.Models.User
{
    public class RegisterUserVM
    {
        public List<DropDownOptions> DistrictList { get; set; }
        public List<ExDropDownOptions> DesignationList { get; set; }
        public List<string> SQList { get; set; }
    }
}
using BusinessLogicLayer.IRepository;
using BusinessObjectLayer;
using MAA.Models.Master;
using MAA.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MAA.Controllers
{
    public class HomeController : Controller
    {
        IMasterRepository _iMaster;
        string pMsg = "";
        public HomeController(IMasterRepository imaster)
        {
            _iMaster = imaster;
        }
        public ActionResult Index()
        {
            LogInUserVM model = new LogInUserVM();
            return View(model);
        }
        public ActionResult SignUp() 
        {
            RegisterUserVM model = new RegisterUserVM();
            model.DistrictList = _iMaster.GetDistricts(ref pMsg);
            model.DesignationList = _iMaster.GetDesignations(ref pMsg);
            model.SQList = MyHelper.GetSecretQuestions();
            return View(model);
        }
        public ActionResult DashBoard() 
        {
            return View();
        }

    }
}
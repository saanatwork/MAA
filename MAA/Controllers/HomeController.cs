using BusinessLogicLayer.IRepository;
using MAA.Models.Master;
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
            xyz model = new xyz();
            model.Banks= _iMaster.GetBankName(ref pMsg);
            return View(model);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
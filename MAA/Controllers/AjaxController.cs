using BusinessLogicLayer.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MAA.Controllers
{
    public class AjaxController : Controller
    {
        IMasterRepository _iMaster;
        string pMsg = "";
        public AjaxController(IMasterRepository imaster)
        {
            _iMaster = imaster;
        }
        // GET: Ajax
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetBankName()
        {
            var result = _iMaster.GetBankName(ref pMsg);
            return Json(result, JsonRequestBehavior.AllowGet);
        }



    }
}
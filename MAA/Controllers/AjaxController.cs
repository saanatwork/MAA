using BusinessLogicLayer.IRepository;
using BusinessObjectLayer.CommonClass;
using BusinessObjectLayer.MyUser;
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
        IUserRepository _iUser;
        string pMsg = "";
        public AjaxController(IMasterRepository imaster, IUserRepository iUser)
        {
            _iMaster = imaster;
            _iUser = iUser;
        }
        // GET: Ajax
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetDistricts()
        {
            var result = _iMaster.GetDistricts(ref pMsg);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBlockOfaDistrict(int DistrictID,bool IsRural)
        {
            var result = _iMaster.GetBlockOfaDistrict(DistrictID, IsRural, ref pMsg);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDesignations()
        {
            var result = _iMaster.GetDesignations(ref pMsg);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SetUser(MSSYUser data)
        {
            CustomAjaxResponse result = new CustomAjaxResponse();
            if (data != null)
            {
                if (_iUser.SetUser(data, ref pMsg))
                {
                    result.bResponseBool = true;
                    result.sResponseString = pMsg;
                }
                else 
                {
                    result.bResponseBool = false;
                    result.sResponseString = pMsg;
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult LogIn(MSSYUser data)
        {
            CustomAjaxResponse result = new CustomAjaxResponse();
            if (_iUser.LoginUser(data.UserName, data.RawPassword, ref pMsg))
            {
                result.bResponseBool = true;
                result.sResponseString = pMsg;
            }
            else
            {
                result.bResponseBool = false;
                result.sResponseString = pMsg;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ValidateUser(string UserID)
        {
            CustomAjaxResponse result = new CustomAjaxResponse();
            if (_iUser.ValidateUser(UserID, ref pMsg))
            {
                result.bResponseBool = true;
                result.sResponseString = pMsg;
            }
            else
            {
                result.bResponseBool = false;
                result.sResponseString = pMsg;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
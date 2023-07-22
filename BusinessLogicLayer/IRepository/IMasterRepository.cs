using BusinessObjectLayer.CommonClass;
using BusinessObjectLayer.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IRepository
{
    public interface IMasterRepository
    {
        List<BankMaster> GetBankName(ref string pMsg);
        string GetDocNo(string DocPattern, ref string pMsg);
        List<DropDownOptions> GetDistricts(ref string pMsg);
        List<DropDownOptions> GetBlockOfaDistrict(int DistrictID, ref string pMsg);
        List<ExDropDownOptions> GetDesignations(ref string pMsg);
    }
}

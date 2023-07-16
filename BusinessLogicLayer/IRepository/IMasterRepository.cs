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
    }
}

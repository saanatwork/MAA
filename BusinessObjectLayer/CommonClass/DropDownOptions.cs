using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.CommonClass
{
    public class DropDownOptions
    {
        public int ID { get; set; }
        public string DisplayText { get; set; }
    }
    public class ExDropDownOptions: DropDownOptions
    {
        public string IDStr { get; set; }
    }
}

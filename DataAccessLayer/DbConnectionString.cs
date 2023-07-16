using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public static class DbConnectionString
    {
        //public static string DBConRead = ConfigurationManager.AppSettings["DBConRead"].ToString().ToUpper();
        //public static string AppEnvironment = ConfigurationManager.AppSettings["AppEnvironment"].ToString().ToUpper();
        public static string GetDBConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer
{
    public static class MyHelper
    {
        public static List<string> GetSecretQuestions() 
        {
            List<string> Result = new List<string>();
            Result.Add("What Is Your Favourite Color?");
            Result.Add("What Is Your Year Of Birth?");
            Result.Add("What Is Name Of Your First School?");
            Result.Add("Who Is Your Favourite Teacher?");
            Result.Add("Who Is Your Favourite Leader?");
            return Result;
        }
    }
}

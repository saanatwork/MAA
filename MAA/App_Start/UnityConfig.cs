using BusinessLogicLayer.IRepository;
using BusinessLogicLayer.Repository;
using System.Web.Mvc;
using Unity;
using Unity.Mvc5;

namespace MAA
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<IMasterRepository, MasterRepository>();
            container.RegisterType<IUserRepository, UserRepository>();
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}
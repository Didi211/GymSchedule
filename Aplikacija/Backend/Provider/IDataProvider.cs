using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.DB
{
    public interface IDataProvider
    {
        Task<IList<Gym>> GetAllGyms();
    }
}
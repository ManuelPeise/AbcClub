using System.ComponentModel.DataAnnotations;

namespace Shared.Models
{
    public class UserDataModel
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Firstname { get; set; }
    }
}

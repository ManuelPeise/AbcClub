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
        public string Email { get; set; }
        public bool IsTeacher { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
    }
}

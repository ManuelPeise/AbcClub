using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.UserContext.Migrations
{
    public partial class extendUserDataTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "UserData",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsTeacher",
                table: "UserData",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "UserData",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Salt",
                table: "UserData",
                type: "text",
                nullable: true);

            var sql = $"UPDATE userdata set email = {""}, password = {""}, salt = {""} WHERE id >= 0 AND isteacher = false;";

            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "UserData");

            migrationBuilder.DropColumn(
                name: "IsTeacher",
                table: "UserData");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "UserData");

            migrationBuilder.DropColumn(
                name: "Salt",
                table: "UserData");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace Data.AppData.Migrations
{
    public partial class addUnitStore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UnitContext",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Context = table.Column<string>(type: "text", nullable: false),
                    UnitSolution = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitContext", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UnitStore",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    UnitType = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    UnitContextId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitStore", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UnitStore_UnitContext_UnitContextId",
                        column: x => x.UnitContextId,
                        principalTable: "UnitContext",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UnitStore_UnitContextId",
                table: "UnitStore",
                column: "UnitContextId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UnitStore");

            migrationBuilder.DropTable(
                name: "UnitContext");
        }
    }
}

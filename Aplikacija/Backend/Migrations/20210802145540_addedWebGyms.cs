using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class addedWebGyms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WebSajt",
                table: "GYM",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WebSajt",
                table: "GYM");
        }
    }
}

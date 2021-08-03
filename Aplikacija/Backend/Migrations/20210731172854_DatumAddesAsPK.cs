using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class DatumAddesAsPK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TERMIN",
                table: "TERMIN");

            migrationBuilder.AlterColumn<string>(
                name: "Datum",
                table: "TERMIN",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TERMIN",
                table: "TERMIN",
                columns: new[] { "UserID", "GymID", "Datum" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TERMIN",
                table: "TERMIN");

            migrationBuilder.AlterColumn<string>(
                name: "Datum",
                table: "TERMIN",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TERMIN",
                table: "TERMIN",
                columns: new[] { "UserID", "GymID" });
        }
    }
}

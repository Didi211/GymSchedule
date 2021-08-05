using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class IzbacenCheck : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_USER_GymID_UserType",
                table: "USER");

            migrationBuilder.AlterColumn<string>(
                name: "UserType",
                table: "USER",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_USER_GymID",
                table: "USER",
                column: "GymID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_USER_GymID",
                table: "USER");

            migrationBuilder.AlterColumn<string>(
                name: "UserType",
                table: "USER",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_USER_GymID_UserType",
                table: "USER",
                columns: new[] { "GymID", "UserType" },
                unique: true,
                filter: "[GymID] IS NOT NULL AND [UserType] IS NOT NULL");
        }
    }
}

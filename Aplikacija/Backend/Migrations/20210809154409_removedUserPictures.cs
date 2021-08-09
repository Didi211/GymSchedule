using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class removedUserPictures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PICTURE_UserID",
                table: "PICTURE");

            migrationBuilder.CreateIndex(
                name: "IX_PICTURE_UserID",
                table: "PICTURE",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PICTURE_UserID",
                table: "PICTURE");

            migrationBuilder.CreateIndex(
                name: "IX_PICTURE_UserID",
                table: "PICTURE",
                column: "UserID",
                unique: true,
                filter: "[UserID] IS NOT NULL");
        }
    }
}

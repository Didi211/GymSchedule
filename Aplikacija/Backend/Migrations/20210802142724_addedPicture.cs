using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class addedPicture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PICTURE_UserID",
                table: "PICTURE");

            migrationBuilder.RenameColumn(
                name: "Path",
                table: "PICTURE",
                newName: "ImageName");

            migrationBuilder.CreateIndex(
                name: "IX_PICTURE_UserID",
                table: "PICTURE",
                column: "UserID",
                unique: true,
                filter: "[UserID] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PICTURE_UserID",
                table: "PICTURE");

            migrationBuilder.RenameColumn(
                name: "ImageName",
                table: "PICTURE",
                newName: "Path");

            migrationBuilder.CreateIndex(
                name: "IX_PICTURE_UserID",
                table: "PICTURE",
                column: "UserID");
        }
    }
}

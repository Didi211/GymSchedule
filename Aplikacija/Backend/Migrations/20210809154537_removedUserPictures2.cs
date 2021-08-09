using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class removedUserPictures2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PICTURE_USER_UserID",
                table: "PICTURE");

            migrationBuilder.DropIndex(
                name: "IX_PICTURE_UserID",
                table: "PICTURE");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "PICTURE");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "PICTURE",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PICTURE_UserID",
                table: "PICTURE",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_PICTURE_USER_UserID",
                table: "PICTURE",
                column: "UserID",
                principalTable: "USER",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

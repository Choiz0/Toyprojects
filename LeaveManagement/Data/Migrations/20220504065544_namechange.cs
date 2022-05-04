using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeaveManagement.Data.Migrations
{
    public partial class namechange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "LeaveTypes",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "LeaveAllocations",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "LeaveTypes",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "LeaveAllocations",
                newName: "id");
        }
    }
}

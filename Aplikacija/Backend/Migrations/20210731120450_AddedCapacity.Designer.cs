﻿// <auto-generated />
using System;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Backend.Migrations
{
    [DbContext(typeof(GymContext))]
    [Migration("20210731120450_AddedCapacity")]
    partial class AddedCapacity
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Backend.Models.Gym", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("GymID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("KapacitetPoSatu")
                        .HasColumnType("int")
                        .HasColumnName("KapacitetPoSatu");

                    b.Property<string>("Naziv")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Naziv");

                    b.Property<string>("RadnoVreme")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("RadnoVreme");

                    b.HasKey("ID");

                    b.ToTable("GYM");
                });

            modelBuilder.Entity("Backend.Models.Quote", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("QuoteID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Author");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Content");

                    b.HasKey("ID");

                    b.ToTable("QUOTE");
                });

            modelBuilder.Entity("Backend.Models.Termin", b =>
                {
                    b.Property<int>("UserID")
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    b.Property<int>("GymID")
                        .HasColumnType("int")
                        .HasColumnName("GymID");

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime2")
                        .HasColumnName("Datum");

                    b.Property<bool>("Zavrsen")
                        .HasColumnType("bit")
                        .HasColumnName("Zavrsen");

                    b.HasKey("UserID", "GymID");

                    b.HasIndex("GymID");

                    b.ToTable("TERMIN");
                });

            modelBuilder.Entity("Backend.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("UserID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BrojKartice")
                        .HasMaxLength(10)
                        .HasColumnType("int")
                        .HasColumnName("BrojKartice");

                    b.Property<int?>("GymID")
                        .HasColumnType("int")
                        .HasColumnName("GymID");

                    b.Property<string>("Ime")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Ime");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Password");

                    b.Property<string>("Pol")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Pol");

                    b.Property<string>("Prezime")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Prezime");

                    b.Property<string>("UserType")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("UserType");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Username");

                    b.HasKey("ID");

                    b.HasIndex("Username")
                        .IsUnique();

                    b.HasIndex("BrojKartice", "GymID")
                        .IsUnique()
                        .HasFilter("[GymID] IS NOT NULL");

                    b.HasIndex("GymID", "UserType")
                        .IsUnique()
                        .HasFilter("[GymID] IS NOT NULL AND [UserType] IS NOT NULL");

                    b.ToTable("USER");
                });

            modelBuilder.Entity("Backend.Models.Termin", b =>
                {
                    b.HasOne("Backend.Models.Gym", "Gym")
                        .WithMany("ZakazaniTermini")
                        .HasForeignKey("GymID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Models.User", "User")
                        .WithMany("ZakazaniTermini")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Gym");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend.Models.User", b =>
                {
                    b.HasOne("Backend.Models.Gym", "Gym")
                        .WithMany("Klijenti")
                        .HasForeignKey("GymID");

                    b.Navigation("Gym");
                });

            modelBuilder.Entity("Backend.Models.Gym", b =>
                {
                    b.Navigation("Klijenti");

                    b.Navigation("ZakazaniTermini");
                });

            modelBuilder.Entity("Backend.Models.User", b =>
                {
                    b.Navigation("ZakazaniTermini");
                });
#pragma warning restore 612, 618
        }
    }
}

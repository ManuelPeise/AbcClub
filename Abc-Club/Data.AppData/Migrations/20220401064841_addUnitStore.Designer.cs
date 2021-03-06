// <auto-generated />
using System;
using Data.AppData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Data.AppData.Migrations
{
    [DbContext(typeof(AppDataContext))]
    [Migration("20220401064841_addUnitStore")]
    partial class addUnitStore
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.15");

            modelBuilder.Entity("Shared.Models.CustomUnit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<int?>("UnitContextId")
                        .HasColumnType("int");

                    b.Property<int>("UnitType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UnitContextId");

                    b.ToTable("UnitStore");
                });

            modelBuilder.Entity("Shared.Models.UnitContext", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Context")
                        .HasColumnType("text");

                    b.Property<string>("UnitSolution")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("UnitContext");
                });

            modelBuilder.Entity("Shared.Models.UnitResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<int>("Points")
                        .HasColumnType("int");

                    b.Property<int>("QuestionCount")
                        .HasColumnType("int");

                    b.Property<int>("UnitType")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("UnitResults");
                });

            modelBuilder.Entity("Shared.Models.CustomUnit", b =>
                {
                    b.HasOne("Shared.Models.UnitContext", "UnitContext")
                        .WithMany()
                        .HasForeignKey("UnitContextId");

                    b.Navigation("UnitContext");
                });
#pragma warning restore 612, 618
        }
    }
}

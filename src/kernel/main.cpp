#include <core/utils.h>
#include <core/renderer.h>
#include <core/terminal.h>
#include <mm/pmm.h>
#include <core/gdt.h>

struct BootInfo
{
	FrameBuffer* frameBuffer;
	Psf1Font* psf1Font;
	EfiMemoryDescriptor* memoryMap;
	uint64_t memoryMapSize;
	uint64_t memoryMapDescriptorSize;
};

extern "C" void main(BootInfo* bootInfo)
{
   Renderer renderer(bootInfo->frameBuffer, bootInfo->psf1Font, {132, 156, 247});

   renderer.ClearScreen({0, 0, 0});

	Terminal terminal(400, 100, bootInfo->frameBuffer->Width - 400 * 2, bootInfo->frameBuffer->Height - 100 * 2, 1, {0, 255, 0}, {50, 50, 50});

	terminal.Print((char*)"Welcome to COS...\n");

	// ---------------------------- System Specs ----------------------------------
	terminal.Print("Resolution: ");
	terminal.PrintNumber(bootInfo->frameBuffer->Width);
	terminal.Print("x");
	terminal.PrintNumber(bootInfo->frameBuffer->Height);
	terminal.Print("\nVideo Memory Buffer: ");
	terminal.PrintHex((uint64_t)bootInfo->frameBuffer->BaseAddress);
	terminal.Print("\n\n");
	// ----------------------------------------------------------------------------
	
	PhysicalMemoryManager pmm(bootInfo->memoryMap, bootInfo->memoryMapSize, bootInfo->memoryMapDescriptorSize);

	/*for (int i = 0; i < 3; ++i)*/
	/*{*/
	/*	terminal.PrintHex(pmm.AllocatePage());*/
	/*	terminal.Print("\n");*/
	/*}*/
   
   GlobalDescriptorTable gdt;

	while(1);
}

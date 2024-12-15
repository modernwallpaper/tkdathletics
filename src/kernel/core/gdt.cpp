#include <core/gdt.h>
#include <core/utils.h>

GlobalDescriptorTable::GlobalDescriptorTable()
: nullSegmentSelector(0, 0, 0),
  unusedSegmentSelector(0, 0, 0),
  codeSegmentSelector(0, 0, 0x9A),
  dataSegmentSelector(0, 0, 0x92)
{
    uint64_t gdtDescriptor[2]; // Use 64-bit values for GDT descriptor
    uintptr_t thisPtr = (uintptr_t)this;

    // GDT Descriptor: first 64-bit value stores base (low 48 bits) and limit (16 bits)
    gdtDescriptor[0] = (sizeof(GlobalDescriptorTable) - 1) | (thisPtr << 16);

    // lgdt expects the pointer to a descriptor of size `sizeof(gdtDescriptor) - 1`
    asm volatile("lgdt (%0)" : : "r"(&gdtDescriptor));
}

GlobalDescriptorTable::~GlobalDescriptorTable()
{
}

uint16_t GlobalDescriptorTable::DataSegmentSelector()
{
    return (uint8_t*)&dataSegmentSelector - (uint8_t*)this;
}

uint16_t GlobalDescriptorTable::CodeSegmentSelector()
{
    return (uint8_t*)&codeSegmentSelector - (uint8_t*)this;
}

GlobalDescriptorTable::SegmentDescriptor::SegmentDescriptor(uint32_t base, uint32_t limit, uint8_t flags)
{
    uint8_t* target = (uint8_t*)this;

    // In 64-bit long mode, the base and limit are ignored for code/data segments.
    // You may leave these as zero, except for special cases (e.g., TSS).
    if (limit <= 65536)
    {
        target[6] = 0x40; // Limit in bytes
    }
    else
    {
        // Adjust limit for 4KB granularity
        if ((limit & 0xFFF) != 0xFFF)
        {
            limit = (limit >> 12) - 1;
        }
        else
        {
            limit = limit >> 12;
        }

        target[6] = 0xC0; // Granularity flag for 4KB
    }

    // Set limit (low and high)
    target[0] = limit & 0xFF;
    target[1] = (limit >> 8) & 0xFF;
    target[6] |= (limit >> 16) & 0xF;

    // Set base (low, mid, and high)
    target[2] = base & 0xFF;
    target[3] = (base >> 8) & 0xFF;
    target[4] = (base >> 16) & 0xFF;
    target[7] = (base >> 24) & 0xFF;

    // Set flags
    target[5] = flags;
}

uint32_t GlobalDescriptorTable::SegmentDescriptor::Base()
{
    uint8_t* target = (uint8_t*)this;
    uint32_t result = target[7];
    result = (result << 8) + target[4];
    result = (result << 8) + target[3];
    result = (result << 8) + target[2];

    return result;
}

uint32_t GlobalDescriptorTable::SegmentDescriptor::Limit()
{
    uint8_t* target = (uint8_t*)this;
    uint32_t result = target[6] & 0xF;
    result = (result << 8) + target[1];
    result = (result << 8) + target[0];

    if ((target[6] & 0xC0) == 0xC0)
    {
        result = (result << 12) | 0xFFF;
    }

    return result;
}

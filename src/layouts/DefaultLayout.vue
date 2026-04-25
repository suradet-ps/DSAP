<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue';
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[var(--color-cloud)]">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[6px] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand"
    >
      ข้ามไปยังเนื้อหาหลัก
    </a>

    <AppHeader />

    <main id="main-content" class="grow">
      <slot />
    </main>

    <footer class="mt-auto border-t border-[var(--color-border)] bg-white">
      <div class="shell-container py-8">
        <div class="grid gap-6 lg:grid-cols-[1.3fr,0.9fr,0.8fr]">
          <div class="space-y-3">
            <div class="text-sm font-semibold uppercase tracking-[0.08em] text-brand">
              DSAP
            </div>
            <h2 class="text-xl font-semibold tracking-[-0.01em] text-[var(--color-navy)]">
              แพลตฟอร์มประเมินมาตรฐานความปลอดภัยด้านยา สำหรับโรงพยาบาลอย่างเป็นระบบ
            </h2>
            <p class="max-w-2xl text-sm leading-6 text-[var(--color-subtle)]">
              ออกแบบเพื่อช่วยทีมโรงพยาบาลประเมินตนเองตามมาตรฐานปี 2565 ครอบคลุม 4 มิติ 15 มาตรฐาน พร้อม logic แบบขั้นบันไดและการบันทึกอัตโนมัติ
            </p>
          </div>

          <div class="space-y-3">
            <div class="text-sm font-semibold text-[var(--color-steel)]">
              โครงสร้างการประเมิน
            </div>
            <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div class="panel-card-muted p-4">
                <div class="metric-value text-2xl font-bold text-[var(--color-navy)]">
                  4
                </div>
                <div class="mt-1 text-sm text-[var(--color-subtle)]">
                  มิติการประเมินหลัก
                </div>
              </div>
              <div class="panel-card-muted p-4">
                <div class="metric-value text-2xl font-bold text-[var(--color-navy)]">
                  15
                </div>
                <div class="mt-1 text-sm text-[var(--color-subtle)]">
                  มาตรฐานที่ต้องทบทวน
                </div>
              </div>
              <div class="panel-card-muted p-4">
                <div class="metric-value text-2xl font-bold text-[var(--color-navy)]">
                  5
                </div>
                <div class="mt-1 text-sm text-[var(--color-subtle)]">
                  ระดับพัฒนาแบบ waterfall
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <div class="text-sm font-semibold text-[var(--color-steel)]">
              การใช้งาน
            </div>
            <div class="space-y-2 text-sm leading-6 text-[var(--color-subtle)]">
              <p>1. กรอกข้อมูลพื้นฐานของโรงพยาบาล</p>
              <p>2. ประเมินแต่ละมาตรฐานตามระดับ</p>
              <p>3. ดูสรุปผลภาพรวมเพื่อใช้วางแผนพัฒนา</p>
            </div>
          </div>
        </div>

        <div class="mt-6 border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-subtle)]">
          &copy; {{ new Date().getFullYear() }} Drug Safety Assessment Platform
        </div>
      </div>
    </footer>
  </div>
</template>

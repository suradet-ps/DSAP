<script setup lang="ts">
import { Activity, Menu, ShieldCheck, X } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import BaseButton from '@/components/common/BaseButton.vue';
import { useAssessmentStore } from '@/stores/assessment';
import { formatThaiDate } from '@/utils/assessment';

const route = useRoute();
const isMenuOpen = ref(false);

const store = useAssessmentStore();
const { assessmentState, standards } = storeToRefs(store);

const navItems = [
  { label: 'หน้าแรก', to: '/', match: (path: string) => path === '/' },
  { label: 'แบบประเมิน', to: '/assess/info', match: (path: string) => path.startsWith('/assess') && !path.startsWith('/assess/summary') },
  { label: 'สรุปผล', to: '/assess/summary', match: (path: string) => path.startsWith('/assess/summary') },
];

const assessedStandards = computed(() =>
  standards.value.filter(standard => store.getStandardLevel(standard.id) > 0).length,
);

const assessmentStatus = computed(() => {
  if (assessedStandards.value === 0) {
    return 'ยังไม่เริ่ม';
  }

  if (assessedStandards.value === standards.value.length) {
    return 'ครบทุกมาตรฐาน';
  }

  return `ประเมินแล้ว ${assessedStandards.value}/${standards.value.length}`;
});

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/90 backdrop-blur-md">
    <div class="shell-container">
      <div class="flex min-h-18 items-center justify-between gap-4 py-3">
        <RouterLink to="/" class="flex min-w-0 items-center gap-3" @click="closeMenu">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[var(--color-border)] bg-[var(--color-cloud)] text-brand shadow-[var(--shadow-soft)]">
            <ShieldCheck class="h-5 w-5" :stroke-width="1.9" />
          </span>
          <span class="min-w-0">
            <span class="block truncate text-base font-semibold tracking-[-0.01em] text-[var(--color-navy)]">
              DSAP
            </span>
            <span class="block truncate text-xs text-[var(--color-subtle)]">
              Drug Safety Assessment Platform
            </span>
          </span>
        </RouterLink>

        <nav class="hidden items-center gap-2 lg:flex">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-pill"
            :class="item.match(route.path)
              ? 'bg-[var(--color-info-soft)] text-[#084298]'
              : 'text-[var(--color-steel)] hover:bg-[var(--color-cloud)] hover:text-brand'"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="hidden items-center gap-3 lg:flex">
          <div class="status-chip bg-[var(--color-cloud)] text-[var(--color-steel)]">
            <Activity class="h-3.5 w-3.5" />
            {{ assessmentStatus }}
          </div>
          <div class="text-right">
            <div class="text-xs font-medium text-[var(--color-subtle)]">
              Auto-save เปิดใช้งาน
            </div>
            <div class="metric-value text-xs text-[var(--color-steel)]">
              {{ formatThaiDate(assessmentState.lastUpdated) }}
            </div>
          </div>
          <RouterLink v-slot="{ navigate }" to="/assess/info" custom>
            <BaseButton size="sm" @click="navigate">
              {{ route.path.startsWith('/assess') ? 'กลับไปที่แบบประเมิน' : 'เริ่มประเมิน' }}
            </BaseButton>
          </RouterLink>
        </div>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-[var(--color-border)] bg-white text-[var(--color-steel)] lg:hidden"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle navigation"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Menu v-if="!isMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>

      <div v-if="isMenuOpen" class="border-t border-[var(--color-border)] py-4 lg:hidden">
        <div class="space-y-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center justify-between rounded-[8px] px-4 py-3 text-sm font-medium"
            :class="item.match(route.path)
              ? 'bg-[var(--color-info-soft)] text-[#084298]'
              : 'text-[var(--color-steel)] hover:bg-[var(--color-cloud)]'"
            @click="closeMenu"
          >
            <span>{{ item.label }}</span>
            <span v-if="item.match(route.path)" class="text-xs uppercase tracking-[0.08em]">Active</span>
          </RouterLink>
        </div>

        <div class="mt-4 space-y-3 border-t border-[var(--color-border)] pt-4">
          <div class="status-chip bg-[var(--color-cloud)] text-[var(--color-steel)]">
            <Activity class="h-3.5 w-3.5" />
            {{ assessmentStatus }}
          </div>
          <RouterLink v-slot="{ navigate }" to="/assess/info" custom>
            <BaseButton block @click="navigate(); closeMenu()">
              {{ route.path.startsWith('/assess') ? 'ดำเนินการต่อ' : 'เริ่มประเมิน' }}
            </BaseButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

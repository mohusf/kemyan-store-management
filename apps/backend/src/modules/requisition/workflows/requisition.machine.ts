import { setup, assign } from 'xstate';

export interface RequisitionContext {
  requisitionId: string;
  requesterId: string;
  estimatedValue: number;
  currentApproverId: string | null;
  rejectionReason: string | null;
}

export type RequisitionEvent =
  | { type: 'SUBMIT' }
  | { type: 'APPROVE'; approverId: string }
  | { type: 'REJECT'; approverId: string; reason: string }
  | { type: 'CANCEL' }
  | { type: 'RETURN'; approverId: string; reason: string };

export const requisitionMachine = setup({
  types: {
    context: {} as RequisitionContext,
    events: {} as RequisitionEvent,
  },
  guards: {
    isHighValue: ({ context }) => context.estimatedValue > 50000,
    isMediumValue: ({ context }) =>
      context.estimatedValue > 10000 && context.estimatedValue <= 50000,
    isLowValue: ({ context }) => context.estimatedValue <= 10000,
  },
  actions: {
    setApprover: assign({
      currentApproverId: ({ event }) => {
        if (event.type === 'APPROVE' || event.type === 'REJECT' || event.type === 'RETURN') {
          return event.approverId;
        }
        return null;
      },
    }),
    setRejectionReason: assign({
      rejectionReason: ({ event }) => {
        if (event.type === 'REJECT' || event.type === 'RETURN') {
          return event.reason;
        }
        return null;
      },
    }),
    clearApprover: assign({
      currentApproverId: () => null,
    }),
  },
}).createMachine({
  id: 'requisition',
  initial: 'draft',
  context: {
    requisitionId: '',
    requesterId: '',
    estimatedValue: 0,
    currentApproverId: null,
    rejectionReason: null,
  },
  states: {
    draft: {
      on: {
        SUBMIT: { target: 'pendingSupervisor' },
        CANCEL: { target: 'cancelled' },
      },
    },
    pendingSupervisor: {
      on: {
        APPROVE: [
          {
            target: 'pendingPlantManager',
            guard: 'isHighValue',
            actions: ['setApprover'],
          },
          {
            target: 'pendingStoreManager',
            guard: 'isMediumValue',
            actions: ['setApprover'],
          },
          {
            target: 'pendingProcurement',
            guard: 'isLowValue',
            actions: ['setApprover'],
          },
        ],
        REJECT: {
          target: 'rejected',
          actions: ['setApprover', 'setRejectionReason'],
        },
        CANCEL: { target: 'cancelled' },
      },
    },
    pendingStoreManager: {
      on: {
        APPROVE: [
          {
            target: 'pendingPlantManager',
            guard: 'isHighValue',
            actions: ['setApprover'],
          },
          {
            target: 'pendingProcurement',
            actions: ['setApprover'],
          },
        ],
        REJECT: {
          target: 'rejected',
          actions: ['setApprover', 'setRejectionReason'],
        },
        RETURN: {
          target: 'draft',
          actions: ['setApprover', 'setRejectionReason'],
        },
        CANCEL: { target: 'cancelled' },
      },
    },
    pendingProcurement: {
      on: {
        APPROVE: {
          target: 'approved',
          actions: ['setApprover'],
        },
        REJECT: {
          target: 'rejected',
          actions: ['setApprover', 'setRejectionReason'],
        },
        RETURN: {
          target: 'pendingSupervisor',
          actions: ['setApprover', 'setRejectionReason'],
        },
        CANCEL: { target: 'cancelled' },
      },
    },
    pendingPlantManager: {
      on: {
        APPROVE: {
          target: 'pendingProcurement',
          actions: ['setApprover'],
        },
        REJECT: {
          target: 'rejected',
          actions: ['setApprover', 'setRejectionReason'],
        },
        RETURN: {
          target: 'pendingStoreManager',
          actions: ['setApprover', 'setRejectionReason'],
        },
        CANCEL: { target: 'cancelled' },
      },
    },
    approved: {
      type: 'final',
    },
    rejected: {
      type: 'final',
    },
    cancelled: {
      type: 'final',
    },
  },
});

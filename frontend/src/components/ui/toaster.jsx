"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";
import { useColorMode } from "./color-mode";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  const { colorMode } = useColorMode(); // Detect current color mode

  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root
            width={{ md: "sm" }}
            bg={
              toast.variant === "delete"
                ? "red.500"
                : toast.variant === "edit"
                ? "blue.500"
                : colorMode === "dark"
                ? "white"
                : "black"
            } // Set background color
            color={
              toast.variant === "delete"
                ? "white"
                : toast.variant === "edit"
                ? "white"
                : colorMode === "dark"
                ? "black"
                : "white"
            } // Set text color
            borderRadius="md"
            boxShadow="lg"
            p="4"
          >
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};

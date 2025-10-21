import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguageName = () => {
    return i18n.language === "es"
      ? t("language.spanish")
      : t("language.english");
  };

  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" size="sm">
        <HStack spacing={1}>
          <Text>{t("language.toggle")}</Text>
          <Text fontSize="sm" color="gray.600">
            {getCurrentLanguageName()}
          </Text>
          <HiChevronDown />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => changeLanguage("en")}>
          🇺🇸 {t("language.english")}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("es")}>
          🇪🇸 {t("language.spanish")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LanguageToggle;

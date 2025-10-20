import { Text, Button, Modal, StyleSheet } from "react-native";
import { Vendor } from "../types";

const SiteInfoModal = ({
  visible,
  onClose,
  vendor,
}: {
  visible: boolean;
  onClose: () => void;
  vendor: Vendor | null;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      style={styles.modal}
    >
      <Text style={styles.title}>
        Site Info Modal for {vendor ? vendor.name : "No Vendor Selected"}
      </Text>
      <Text style={styles.description}>
        {vendor ? vendor.description : "No description available."}
      </Text>
      <Button title="Close" onPress={onClose} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  modal: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SiteInfoModal;

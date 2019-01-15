export const getChannelID = () => {
	var url = new URL(window.location);
	return url.searchParams.get("aplestro_channel_id");
}
